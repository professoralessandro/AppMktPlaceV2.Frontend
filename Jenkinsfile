pipeline {
  agent any
    
  stages {
        
    stage('Cloning Git') {
      steps {
        git branch: '$Branch', url: 'https://github.com/professoralessandro/frontend-ap-marketing-place'
      }
    }
    
    stage('Install Npm') {
       steps {
         bat 'npm install'
       }
    }
    
    stage('Lint Validation') {
      steps {
        bat 'npm run lint'
      }
    }
    
    stage('Replacing Artefacts') {
      steps {
        bat 'xcopy /S /E /Y "C://Windows//SysWOW64//config//systemprofile//AppData//Local//Jenkins.jenkins//workspace//DEV-artefacts-marketing-place//Environments//frontend-mkt-dev"  "C://Windows//SysWOW64//config//systemprofile//AppData//Local//Jenkins.jenkins//workspace//DEV-frontend-marketing-place" '
      }
    }
    
    stage('Generating project release') {
      steps {
        bat 'node --max_old_space_size=4096 ./node_modules/@angular/cli/bin/ng build --prod --build-optimizer true --base-href /frontend-ap-marketing-place/ --output-hashing=all'
      }
    }
	 
	  // stage('Stoping Docker Compose') {
    //   steps {
    //     bat 'docker-compose down'
    //   }
    // }

    stage('Deploy Project Docker and Starting Docker Compose') {
       steps {
         bat 'docker-compose  up -d --build'
       }
    }

  }
}
