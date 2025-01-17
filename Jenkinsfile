pipeline {
  agent any

  // Environment
  environment {
    DOCKER_USERNAME = credentials('DOCKER_USERNAME')
    DOCKER_PASSWORD = credentials('DOCKER_PASSWORD')
    HUB_ENV_URL = 'https://dev.hub.service.hmpps.dsd.io'
  }
  options {
    timeout(time: 30, unit: 'MINUTES')
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }


  stages {

    stage ('Checkout') {
      steps {
        checkout scm
      }
    }

    stage ('Build') {
      steps {
        sh 'cd moj-be && make build'
        sh 'cd db && make build'
      }
    }

    stage ('Test') {
      steps {
        sh 'cd moj-be && make test'
      }
    }

    stage ('Deploy') {
      when {
        branch 'master'
      }
      steps {
        sh 'cd moj-be && make push'
        sh 'cd db && make push'
        sshagent(['hub-env-dev-deploy']) {
          sh 'ssh deploy@dev.hub.service.hmpps.dsd.io "cd digital-hub && make prod-up"'
        }
      }
    }

  }

  post {
    always {
      echo 'I have finished'
    }
    success {
      echo 'Build is full of WIN!'
      slackSend channel:'#thehubsystems',
        color: 'good',
        message: 'Build is full of WIN!'
    }
    unstable {
      echo 'I am unstable :/'
    }
    failure {
      echo 'Build is FAIL!'
      slackSend channel:'#thehubsystems',
        color: 'bad',
        message: 'Build FAIL!'
    }
    changed {
      echo 'Things are different...'
    }
  }


}
