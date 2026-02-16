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
          dir('tests/gatling') {
            bat """
              call mvnw.cmd -B gatling:test ^
                -Dgatling.simulationClass=simulations.testSimulation ^
                -DbaseURL="${params.HOST}" ^
                -Dusers="${params.USERS}" ^
                -Dramp="${params.RAMP}" ^
                -Dduration="${params.DURATION}"

              if exist "%WORKSPACE%\\%REPORT_ROOT%\\gatling" rmdir /s /q "%WORKSPACE%\\%REPORT_ROOT%\\gatling"
              mkdir "%WORKSPACE%\\%REPORT_ROOT%\\gatling"
              if exist "target\\gatling" xcopy /E /I /Y "target\\gatling" "%WORKSPACE%\\%REPORT_ROOT%\\gatling"
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
      archiveArtifacts artifacts: 'reports/**/*', allowEmptyArchive: true
    }
  }
}
