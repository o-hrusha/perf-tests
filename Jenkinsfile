pipeline {
  agent any

  parameters {
    string(name: 'HOST', defaultValue: 'http://localhost', description: 'Base URL')
    string(name: 'USERS', defaultValue: '20', description: 'Virtual users')
    string(name: 'RAMP', defaultValue: '30', description: 'Ramp-up seconds')
    string(name: 'DURATION', defaultValue: '60', description: 'Duration seconds')
  }

  stages {
    stage('Prepare Reports') {
      steps {
        script { env.REPORT_ROOT = "reports/build-${env.BUILD_NUMBER}/jmeter" }
        sh """
          set -euo pipefail
          rm -rf "reports/build-${env.BUILD_NUMBER}"
          mkdir -p "${env.REPORT_ROOT}"
        """
      }
    }

stage('Run JMeter (Docker)') {
  steps {
    sh """
      set -euo pipefail

      out='${env.REPORT_ROOT}'
      mkdir -p "\$out"

      cid=\$(docker create --user 0:0 \
        -v "\$PWD:/work" -w /work \
        justb4/jmeter:5.5 \
        -n -t Jmeter_orig/Test.jmx \
        -l /tmp/results.jtl \
        -e -o /tmp/HtmlReport \
        -JbaseURL='${params.HOST}' \
        -Jusers='${params.USERS}' \
        -Jramp='${params.RAMP}' \
        -Jduration='${params.DURATION}'
      )

      docker start -a "\$cid"

      docker cp "\$cid:/tmp/results.jtl" "\$out/results.jtl"
      docker cp "\$cid:/tmp/HtmlReport" "\$out/HtmlReport"

      docker rm "\$cid" >/dev/null
    """
  }
}


  post {
    always {
      archiveArtifacts artifacts: 'reports/**/*', allowEmptyArchive: true
      cleanWs()
    }
  }
}
