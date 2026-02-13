pipeline {
  agent any

  parameters {
    string(name: 'HOST', defaultValue: 'http://localhost', description: 'Base URL')
    string(name: 'USERS', defaultValue: '10', description: 'Virtual users')
    string(name: 'RAMP', defaultValue: '30', description: 'Ramp-up seconds')
    string(name: 'DURATION', defaultValue: '60', description: 'Duration seconds')
    booleanParam(name: 'RUN_JMETER', defaultValue: true, description: 'Execute JMeter stage')
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
          mkdir "%REPORT_ROOT%\\jmeter"
        """
      }
    }

    stage('JMeter') {
      when { expression { return params.RUN_JMETER } }
      steps {
        bat """
          set "OUT=%REPORT_ROOT%\\jmeter"

          rem normalize HOST: remove http:// or https://
          set "JM_HOST=${params.HOST}"
          set "JM_HOST=%JM_HOST:http://=%"
          set "JM_HOST=%JM_HOST:https://=%"

          echo Running JMeter with:
          echo Host: %JM_HOST%
          echo Users: ${params.USERS}
          echo Ramp: ${params.RAMP}
          echo Duration: ${params.DURATION}

          "%JMETER_HOME%\\bin\\jmeter.bat" ^
            -n ^
            -t "%WORKSPACE%\\Jmeter_orig\\Test.jmx" ^
            -l "%WORKSPACE%\\%OUT%\\results.jtl" ^
            -j "%WORKSPACE%\\%OUT%\\jmeter.log" ^
            -JS01_host_name="%JM_HOST%" ^
            -JS01_v_users="${params.USERS}" ^
            -JS01_ramp_up="${params.RAMP}" ^
            -JS01_duration="${params.DURATION}"
        """
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'reports/**/*', allowEmptyArchive: true
    }
  }
}
