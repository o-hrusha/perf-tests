pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Run JMeter in Docker') {
      steps {
        sh '''
          chmod +x scripts/run-jmeter-docker.sh
          bash scripts/run-jmeter-docker.sh
        '''
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'artifacts/**/*', fingerprint: true
    }
  }
}
