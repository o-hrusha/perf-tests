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
          dir('gatling') {
            bat """
              if exist mvnw.cmd (
                call mvnw.cmd -B gatling:test ^
                  -Dgatling.simulationClass=simulations.testSimulation ^
                  -DbaseURL="${params.HOST}" ^
                  -Dusers="${params.USERS}" ^
                  -Dramp="${params.RAMP}" ^
                  -Dduration="${params.DURATION}"
              ) else (
                if exist mvnw (
                  echo Found mvnw but on Windows expected mvnw.cmd. Please add mvnw.cmd.
                  exit /b 2
                ) else (
                  echo mvnw.cmd not found in gatling\\
                  exit /b 2
                )
              )

              set "DEST=..\\%REPORT_ROOT%\\gatling"
              if exist "%DEST%" rmdir /s /q "%DEST%"
              mkdir "%DEST%"

              if exist "target\\gatling" (
                xcopy /e /i /y "target\\gatling\\*" "%DEST%\\"
              ) else (
                echo target\\gatling not found
                exit /b 3
              )
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
            set "OUT=%REPORT_ROOT%\\jmeter"
            if exist "%OUT%" rmdir /s /q "%OUT%"
            mkdir "%OUT%"
            mkdir "%OUT%\\report"

            rem normalize HOST: remove http:// or https:// for JMeter Server Name
            set "JM_HOST=${params.HOST}"
            set "JM_HOST=%JM_HOST:http://=%"
            set "JM_HOST=%JM_HOST:https://=%"

            rem IMPORTANT: run from workspace so relative paths in Test.jmx / testdata work
            "%JMETER_HOME%\\bin\\jmeter.bat" ^
              -n ^
              -t "%WORKSPACE%\\Jmeter_orig\\Test.jmx" ^
              -l "%WORKSPACE%\\%OUT%\\results.jtl" ^
              -e -o "%WORKSPACE%\\%OUT%\\report" ^
              -JS01_host_name="%JM_HOST%" ^
              -JS01_v_users="${params.USERS}" ^
              -JS01_ramp_up="${params.RAMP}" ^
              -JS01_duration="${params.DURATION}"
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
              npm ci
              set "LH_BASE_URL=${params.HOST}"
              node shopizer.js

              set "DEST=..\\%REPORT_ROOT%\\lighthouse"
              if exist "%DEST%" rmdir /s /q "%DEST%"
              mkdir "%DEST%"

              if exist flow.report.html (
                copy /y flow.report.html "%DEST%\\flow-%BUILD_NUMBER%.html"
              ) else (
                echo flow.report.html not found
                exit /b 4
              )
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
    cleanup {
      cleanWs()
    }
  }
}
