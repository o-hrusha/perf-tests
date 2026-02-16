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
          dir('gatling') {
            bat """
              call mvn -B clean gatling:test ^
                -Dgatling.simulationClass=simulations.PerfTestSimulation ^
                -DbaseURL="${params.HOST}" ^
                -Dusers="${params.USERS}" ^
                -DrampSeconds="${params.RAMP}" ^
                -DsteadySeconds="${params.DURATION}"
              if errorlevel 1 exit /b 1

              if exist "%WORKSPACE%\\%REPORT_ROOT%\\gatling\\report" rmdir /s /q "%WORKSPACE%\\%REPORT_ROOT%\\gatling\\report"
              if errorlevel 1 exit /b 1
              mkdir "%WORKSPACE%\\%REPORT_ROOT%\\gatling\\report"
              if errorlevel 1 exit /b 1

              for /f "delims=" %%D in ('dir /b /ad /o-d "target\\gatling" 2^>nul') do (
                xcopy /E /I /Y "target\\gatling\\%%D\\*" "%WORKSPACE%\\%REPORT_ROOT%\\gatling\\report\\"
                if errorlevel 1 exit /b 1
                goto :done
              )
              :done

              if exist "%WORKSPACE%\\%REPORT_ROOT%\\gatling\\raw" rmdir /s /q "%WORKSPACE%\\%REPORT_ROOT%\\gatling\\raw"
              if errorlevel 1 exit /b 1
              mkdir "%WORKSPACE%\\%REPORT_ROOT%\\gatling\\raw"
              if errorlevel 1 exit /b 1
              if exist "target\\gatling" xcopy /E /I /Y "target\\gatling" "%WORKSPACE%\\%REPORT_ROOT%\\gatling\\raw"
              if errorlevel 1 exit /b 1
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
            set "JM_HOST=${params.HOST}"
            set "JM_HOST=!JM_HOST:http://=!"
            set "JM_HOST=!JM_HOST:https://=!"

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
          dir('Lighthouse') {
            bat """
              call npm ci
              set "LH_BASE_URL=${params.HOST}"
              call node Placing-an-order-for-random-table-with-page-objects.js

              if exist "%WORKSPACE%\\%REPORT_ROOT%\\lighthouse" rmdir /s /q "%WORKSPACE%\\%REPORT_ROOT%\\lighthouse"
              mkdir "%WORKSPACE%\\%REPORT_ROOT%\\lighthouse"

              for /f "delims=" %%F in ('dir /b /a:-d /o-d *.html 2^>nul') do (
                copy /Y "%%F" "%WORKSPACE%\\%REPORT_ROOT%\\lighthouse\\flow-%BUILD_NUMBER%.html"
                goto :done
              )
              :done
            """
          }
        }
      }
    }
  }

  post {
    always {

      publishHTML(target: [
        reportDir: "reports/build-${env.BUILD_NUMBER}/jmeter/report",
        reportFiles: "index.html",
        reportName: "JMeter HTML Report",
        keepAll: true,
        alwaysLinkToLastBuild: true,
        allowMissing: true
      ])

      publishHTML(target: [
        reportDir: "reports/build-${env.BUILD_NUMBER}/gatling/report",
        reportFiles: "index.html",
        reportName: "Gatling HTML Report",
        keepAll: true,
        alwaysLinkToLastBuild: true,
        allowMissing: true
      ])

      publishHTML(target: [
        reportDir: "reports/build-${env.BUILD_NUMBER}/lighthouse",
        reportFiles: "flow-${env.BUILD_NUMBER}.html",
        reportName: "Lighthouse HTML Report",
        keepAll: true,
        alwaysLinkToLastBuild: true,
        allowMissing: true
      ])

      archiveArtifacts artifacts: "reports/build-${env.BUILD_NUMBER}/jmeter/results.jtl", allowEmptyArchive: true
      archiveArtifacts artifacts: "reports/build-${env.BUILD_NUMBER}/jmeter/jmeter.log", allowEmptyArchive: true
      archiveArtifacts artifacts: "reports/build-${env.BUILD_NUMBER}/gatling/**", allowEmptyArchive: true
      archiveArtifacts artifacts: "reports/build-${env.BUILD_NUMBER}/lighthouse/*.html", allowEmptyArchive: true
    }

    cleanup {
      cleanWs()
    }
  }
}
