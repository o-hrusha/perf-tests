pipeline {
  agent any

  parameters {
    string(name: 'HOST', defaultValue: 'http://localhost', description: 'Base URL for all tools')
    string(name: 'USERS', defaultValue: '10', description: 'Virtual users for Gatling and JMeter')
    string(name: 'RAMP', defaultValue: '30', description: 'Ramp-up duration (seconds)')
    string(name: 'DURATION', defaultValue: '60', description: 'Steady-state duration (seconds)')

    booleanParam(name: 'RUN_GATLING', defaultValue: true, description: 'Execute Gatling stage')
    booleanParam(name: 'RUN_JMETER', defaultValue: true, description: 'Execute JMeter stage')
    booleanParam(name: 'RUN_LIGHTHOUSE', defaultValue: true, description: 'Execute Lighthouse stage')
  }

  environment {
    JMETER_HOME = 'C:\\apache-jmeter-5.5'

    // Make Maven visible for Jenkins service user
    MAVEN_HOME = 'C:\\Users\\Oleksandr_Hrusha\\Desktop\\apache-maven-3.9.12'
    PATH = "${env.MAVEN_HOME}\\bin;${env.PATH}"

    REPORT_ROOT = "reports\\build-${BUILD_NUMBER}"
  }

  stages {

    stage('Prepare Reports') {
      steps {
        bat """
          if exist "%REPORT_ROOT%" rmdir /s /q "%REPORT_ROOT%"
          mkdir "%REPORT_ROOT%"
          mkdir "%REPORT_ROOT%\\gatling"
          mkdir "%REPORT_ROOT%\\jmeter"
          mkdir "%REPORT_ROOT%\\lighthouse"
        """
      }
    }

    stage('Validate Selection') {
      steps {
        script {
          if (!params.RUN_GATLING && !params.RUN_JMETER && !params.RUN_LIGHTHOUSE) {
            error('Select at least one tool to execute.')
          }
        }
      }
    }

    stage('Gatling') {
      when { expression { return params.RUN_GATLING } }
      steps {
        catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {

          script {
            // Convert DURATION seconds -> steadyMinutes (ceil), minimum 1, sandbox-safe
            int durSec = (params.DURATION as Integer)
            int steadyMin = (durSec + 59) / 60
            if (steadyMin < 1) { steadyMin = 1 }
            env.GATLING_STEADY_MINUTES = steadyMin.toString()
          }

          dir('gatling') {
            bat """
              @echo on
              where mvn
              call mvn -v

              call mvn -B clean gatling:test ^
                -Dgatling.simulationClass=simulations.PerfTestSimulation ^
                -DbaseURL="${params.HOST}" ^
                -Dusers="${params.USERS}" ^
                -DrampSeconds="${params.RAMP}" ^
                -DsteadyMinutes="%GATLING_STEADY_MINUTES%"

              rem Make a stable folder for HTML Publisher: reports\\build-XX\\gatling\\report
              if exist "%WORKSPACE%\\%REPORT_ROOT%\\gatling\\report" rmdir /s /q "%WORKSPACE%\\%REPORT_ROOT%\\gatling\\report"
              mkdir "%WORKSPACE%\\%REPORT_ROOT%\\gatling\\report"

              rem Find latest Gatling report folder and copy its contents
              for /f "delims=" %%D in ('dir /b /ad /o-d "target\\gatling" 2^>nul') do (
                xcopy /E /I /Y "target\\gatling\\%%D\\*" "%WORKSPACE%\\%REPORT_ROOT%\\gatling\\report\\"
                goto :done
              )
              :done

              rem Also keep raw target/gatling archived if you want
              if exist "%WORKSPACE%\\%REPORT_ROOT%\\gatling\\raw" rmdir /s /q "%WORKSPACE%\\%REPORT_ROOT%\\gatling\\raw"
              mkdir "%WORKSPACE%\\%REPORT_ROOT%\\gatling\\raw"
              if exist "target\\gatling" xcopy /E /I /Y "target\\gatling" "%WORKSPACE%\\%REPORT_ROOT%\\gatling\\raw"
            """
          }
        }
      }
    }

    stage('JMeter') {
      when { expression { return params.RUN_JMETER } }
      steps {
        catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
          bat """
            setlocal EnableExtensions EnableDelayedExpansion

            set "OUT=%REPORT_ROOT%\\jmeter"

            rem normalize HOST: remove http:// or https://
            set "JM_HOST=${params.HOST}"
            set "JM_HOST=!JM_HOST:http://=!"
            set "JM_HOST=!JM_HOST:https://=!"

            echo Running JMeter with:
            echo Host: !JM_HOST!
            echo Users: ${params.USERS}
            echo Ramp: ${params.RAMP}
            echo Duration: ${params.DURATION}

            if exist "%WORKSPACE%\\%OUT%\\report" rmdir /s /q "%WORKSPACE%\\%OUT%\\report"
            mkdir "%WORKSPACE%\\%OUT%\\report"

            "%JMETER_HOME%\\bin\\jmeter.bat" ^
              -n ^
              -t "%WORKSPACE%\\Jmeter_orig\\Test.jmx" ^
              -l "%WORKSPACE%\\%OUT%\\results.jtl" ^
              -j "%WORKSPACE%\\%OUT%\\jmeter.log" ^
              -e -o "%WORKSPACE%\\%OUT%\\report" ^
              -JS01_host_name="!JM_HOST!" ^
              -JS01_v_users="${params.USERS}" ^
              -JS01_ramp_up="${params.RAMP}" ^
              -JS01_duration="${params.DURATION}"

            endlocal
          """
        }
      }
    }

    stage('Lighthouse') {
      when { expression { return params.RUN_LIGHTHOUSE } }
      steps {
        catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
          dir('tests/lighthouse') {
            bat """
              call npm ci
              set "LH_BASE_URL=${params.HOST}"
              call node shopizer.js

              if exist "%WORKSPACE%\\%REPORT_ROOT%\\lighthouse" rmdir /s /q "%WORKSPACE%\\%REPORT_ROOT%\\lighthouse"
              mkdir "%WORKSPACE%\\%REPORT_ROOT%\\lighthouse"
              if exist "flow.report.html" copy /Y "flow.report.html" "%WORKSPACE%\\%REPORT_ROOT%\\lighthouse\\flow-%BUILD_NUMBER%.html"
            """
          }
        }
      }
    }
  }

  post {
    always {

      // ✅ Publish JMeter HTML report in Jenkins UI
      publishHTML(target: [
        reportDir: "reports/build-${env.BUILD_NUMBER}/jmeter/report",
        reportFiles: "index.html",
        reportName: "JMeter HTML Report",
        keepAll: true,
        alwaysLinkToLastBuild: true,
        allowMissing: true
      ])

      // ✅ Publish Gatling HTML report in Jenkins UI (stable path we created)
      publishHTML(target: [
        reportDir: "reports/build-${env.BUILD_NUMBER}/gatling/report",
        reportFiles: "index.html",
        reportName: "Gatling HTML Report",
        keepAll: true,
        alwaysLinkToLastBuild: true,
        allowMissing: true
      ])

      // Keep archives too (optional but useful)
      archiveArtifacts artifacts: "reports/build-${env.BUILD_NUMBER}/jmeter/results.jtl", allowEmptyArchive: true
      archiveArtifacts artifacts: "reports/build-${env.BUILD_NUMBER}/jmeter/jmeter.log", allowEmptyArchive: true
      archiveArtifacts artifacts: "reports/build-${env.BUILD_NUMBER}/gatling/**", allowEmptyArchive: true
      archiveArtifacts artifacts: "reports/build-${env.BUILD_NUMBER}/lighthouse/*.html", allowEmptyArchive: true
    }
  }
}
