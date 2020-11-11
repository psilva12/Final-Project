pipeline{
        agent any
        environment {
            app_version = 'v2.1'
            rollback = 'true'
        }
        stages{
            stage('Build Frontend Image'){
                            steps{
                                script{
                                    if (env.rollback == 'false'){

                                        // Check which dockerhub to use
                                        image1 = docker.build("judithed/frontend", "./src/main/resources/final-project-frontend")
                                       // image2 = docker.build("final_project_backend", "./")
                                    }
                                }
                            }
            }
            stage('Tag & Push Frontend Image'){
                            steps{
                                script{
                                    if (env.rollback == 'false'){
                                        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials'){
                                            image1.push("${env.app_version}")
                                           // image2.push("${env.app_version}")
                                        }
                                    }
                                }
                            }
                        }
//             stage('Build Backend Image'){
//                             steps{
//                                 withCredentials([string(credentialsId: 'databaseurl', variable: 'my_url'),string(credentialsId: 'databaseUsername', variable: 'my_user'), string(credentialsId: 'databasePassword', variable: 'my_pw')]){
//                                  sh '''
//                                  sed -i s+databasepassword+$my_pw+g src/main/resources/application-dev.properties
//                                  sed -i s+databaseurl+$my_url+g src/main/resources/application-dev.properties
//                                  sed -i s+databaseusername+$my_user+g src/main/resources/application-dev.properties
//                                  '''
//
//                                 script{
//                                     if (env.rollback == 'false'){
//
//                                         // Check which dockerhub to use
//                                         //image1 = docker.build("judithed/final_project_backend", "./src/main/resources/final-project-frontend")
//                                         image2 = docker.build("judithed/backend", "./")
//                                     }
//                                 }
//                             }
//                             }
//             }
//             stage('Tag & Push Backend Image'){
//                             steps{
//                                 script{
//                                     if (env.rollback == 'false'){
//                                         docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials'){
//                                             //image1.push("${env.app_version}")
//                                             image2.push("${env.app_version}")
//                                         }
//                                     }
//                                 }
//                             }
//                         }
       
            stage('Testing'){
                steps{
                    withCredentials([file(credentialsId: 'vm_key', variable: 'my_key'), string(credentialsId: 'databaseurl', variable: 'my_url'),string(credentialsId: 'databaseUsername', variable: 'my_user'), string(credentialsId: 'databasePassword', variable: 'my_pw')]){
                    sh '''

                    ssh -tt -o StrictHostKeyChecking=no -i $my_key ubuntu@ec2-18-133-75-70.eu-west-2.compute.amazonaws.com << EOF

                    rm -rf Final-Project
                    git clone https://github.com/psilva12/Final-Project
                    cd Final-Project
                    git checkout development

                    sed -i s+databasepassword+$my_pw+g src/main/resources/application-dev.properties
                    sed -i s+databaseurl+$my_url+g src/main/resources/application-dev.properties
                    sed -i s+databaseusername+$my_user+g src/main/resources/application-dev.properties

                    mvn test

                    exit
                    >> EOF

                    '''
                    // --cov-report term --cov=sfia2 tests/
                    }
                }
            }
             stage('Deploy') {
                 steps{
                     withCredentials([file(credentialsId: 'vm_key', variable: 'my_key'), string(credentialsId: 'gcloudLogin', variable: 'loginGcloud')]){
                     sh '''

                     ssh -tt -o StrictHostKeyChecking=no -i $my_key ubuntu@ec2-35-178-166-215.eu-west-2.compute.amazonaws.com << EOF
                     sudo service nginx stop

                     rm -rf Final-Project
                     git clone https://github.com/psilva12/Final-Project
                     cd Final-Project
                     git checkout development

                     sed -i s+app_version+$app_version+g kubectl/frontend.yaml
                     docker pull judithed/backend:v2.3
                     docker pull judithed/frontend:$app_version


                     $loginGcloud

                     kubectl apply -f kubectl/
                     kubectl get services

                     ls
                     exit
                     >> EOF
                     '''


                     }

                 }
             }

        }

}
