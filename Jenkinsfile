pipeline {
  agent any

  parameters {
    string(name: 'HOST', defaultValue: 'http://localhost', description: 'Base URL')
    string(name: 'USERS', defaultValue: '20', description: 'Virtual users')
    string(name: 'RAMP', defaultValue: '30', description: 'Ramp-up seconds')
    string(name: 'DURATION', defaultValue: '120', description: 'Duration seconds')
  }

  environment {
    REPORT_ROOT = "reports/build-${BUILD_NUMBER}/jmeter"
  }

  stages {
    stage('Prepare Reports') {
      steps {
        sh '''
          set -euo pipefail
          rm -rf "reports/build-${BUILD_NUMBER}"
          mkdir -p "${REPORT_ROOT}"
        '''
      }
    }

    stage('Run JMeter (Docker)') {
      steps {
        sh '''
          set -euo pipefail

          out="${REPORT_ROOT}"
          mkdir -p "$out"

          cid=$(docker create --user 0:0 --entrypoint "" justb4/jmeter:5.5 sleep 600)

          docker cp Jmeter_orig/Test.jmx "$cid:/Test.jmx"
          docker cp Jmeter_orig/testdata "$cid:/testdata" || true

          docker start "$cid" >/dev/null

          set +e
          docker exec "$cid" jmeter \
            -n -t /Test.jmx \
            -l /tmp/results.jtl \
            -e -o /tmp/HtmlReport \
            -JbaseURL="${HOST}" \
            -Jusers="${USERS}" \
            -Jramp="${RAMP}" \
            -Jduration="${DURATION}"
          rc=$?
          set -e

          docker cp "$cid:/tmp/results.jtl" "$out/results.jtl" || true
          docker cp "$cid:/tmp/HtmlReport" "$out/HtmlReport" || true
          docker logs "$cid" > "$out/container.log" || true

          docker rm -f "$cid" >/dev/null || true

          exit $rc
        '''
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'reports/**/*', allowEmptyArchive: true
      cleanWs()
    }
  }
}
