pipeline {
  agent any

  parameters {
    string(name: 'HOST', defaultValue: 'http://localhost', description: 'Base URL')
    string(name: 'USERS', defaultValue: '20', description: 'Virtual users')
    string(name: 'RAMP', defaultValue: '30', description: 'Ramp-up seconds')
    string(name: 'DURATION', defaultValue: '120', description: 'Duration seconds')
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

      cid=\$(docker create --user 0:0 justb4/jmeter:5.5 sleep 600)

      docker cp Jmeter_orig/Test.jmx "\$cid:/Test.jmx"
      docker cp Jmeter_orig/testdata "\$cid:/testdata" || true

      docker start "\$cid"

      docker exec "\$cid" jmeter \
        -n -t /Test.jmx \
        -l /tmp/results.jtl \
        -e -o /tmp/HtmlReport \
        -JbaseURL='${params.HOST}' \
        -Jusers='${params.USERS}' \
        -Jramp='${params.RAMP}' \
        -Jduration='${params.DURATION}'

      docker cp "\$cid:/tmp/results.jtl" "\$out/results.jtl"
      docker cp "\$cid:/tmp/HtmlReport" "\$out/HtmlReport"

      docker rm -f "\$cid" >/dev/null
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
