def DOCKER_IMAGE_BRANCH = ""
def BRANCES_ARRAY = []

import groovy.json.JsonSlurper

pipeline
{
    options {
        buildDiscarder (
                logRotator (
                        artifactDaysToKeepStr: "",
                        artifactNumToKeepStr: "",
                        daysToKeepStr: "",
                        numToKeepStr: "2"
                )
        )
        disableConcurrentBuilds()
    }

    agent any

    stages
    {
        stage("input")
        {
            steps
            {
                withCredentials([usernamePassword(credentialsId: 'citrjenkins', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    script
                    {
                        //sh "git ls-remote"
                        def branches = getBranches("citronium", "travel-guide2-backend", "${USERNAME}", "${PASSWORD}")

                        SELECTED_BRANCH = input id: "Branch_name", message: "Select a branch", ok: "select",
                        parameters: [
                            //string(defaultValue: "develop", description: "Choice of branch", name: "BRANCH_NAME", trim: true),
                            choice(name: 'BRANCH_NAME', choices: branches, description: 'Available Branches'),
                            string(defaultValue: "IGNORE", description: "", name: "dummy_param", trim: false)
                        ]

                        DOCKER_IMAGE_BRANCH = "${SELECTED_BRANCH.BRANCH_NAME.toLowerCase().replaceAll("/", "_")}"

                        environment {
                            DOCKER_IMAGE_BRANCH = "${DOCKER_IMAGE_BRANCH}"
                        }

                        echo("${SELECTED_BRANCH.BRANCH_NAME}")
                    }
                }
            }
        }

        stage("Clone repo")
        {
            steps{
                checkout(
                    [
                        $class: "GitSCM",
                        branches: [
                            [
                                name: "${SELECTED_BRANCH.BRANCH_NAME}"
                            ]
                        ],
                        doGenerateSubmoduleConfigurations: false,
                        extensions: [],
                        submoduleCfg: [],
                        userRemoteConfigs: [
                            [
                                credentialsId: "citrjenkins",
                                url: "https://bitbucket.org/citronium/travel-guide2-backend.git"
                            ]
                        ]
                    ]
                )
            }
        }

        stage("Prepare build image") {
            steps {
                sh "docker build -f Dockerfile.build . -t travel-guide2-backend-build:${DOCKER_IMAGE_BRANCH}"
            }
        }

        stage("Prepare build")
        {
            agent
            {
                docker
                {
                    image "travel-guide2-backend-build:${DOCKER_IMAGE_BRANCH}"
                    args "-v ${PWD}:/usr/src/app -w /usr/src/app"
                    reuseNode true
                    label "build-image"
                }
            }
            steps{
                sh "npm i"
            }
        }

        stage('Run SonarQube') {
            agent
            {
                docker
                {
                    image "travel-guide2-backend-build:${DOCKER_IMAGE_BRANCH}"
                    args "-v ${PWD}:/usr/src/app -w /usr/src/app"
                    reuseNode true
                    label "build-image"
                }
            }

            steps {
                withSonarQubeEnv('Sonar') {
                    sh """sonar-scanner \
                   -Dsonar.projectKey="travel-api" \
                   -Dsonar.projectName="travel-api" \
                   -Dsonar.projectVersion=0.0.1 \
                   -Dsonar.sources=src/ \
                   -Dsonar.exclusions="node_modules/**, src/node_modules/**, src/domain/share/types/**, src/infrastructure/database/typeorm/**"
                   """
                }
            }
        }


        stage("Start build")
        {
            agent
            {
                docker
                {
                    image "travel-guide2-backend-build:${DOCKER_IMAGE_BRANCH}"
                    args "-v ${PWD}:/usr/src/app -w /usr/src/app"
                    reuseNode true
                    label "build-image"
                }
            }
            steps{
                sh "./scripts/build.sh"
            }
        }        

        stage('Prepare files') {
            steps {                
                sh "cd dist && zip -qr ../ansible/roles/backend/files/dist.zip ."
            }
        }    

        stage("Deploy service")
        {
            agent
            {
                docker
                {
                    image "travel-guide2-backend-build:${DOCKER_IMAGE_BRANCH}"
                    args "-v ${PWD}:/usr/src/app -w /usr/src/app -v /home/citronium/.ssh/id_rsa:/tmp/id_rsa -u root"
                    reuseNode true
                    label "build-image"
                }
            }
            steps{
                sh "cd ansible && ansible-playbook -i fumus main.yml --tags 'server,dist' -vv"
            }
        }
    }

    post {
        always {
            step([$class: "WsCleanup"])
            cleanWs()
        }
    }
}

def getBranches(String repositoryOwner, String repositorySlug, String username, String password) {
    def resultBranches = new ArrayList()
    def baseUrl = new URL("https://api.bitbucket.org/2.0/repositories/${repositoryOwner}/${repositorySlug}/refs/branches")
    HttpURLConnection connection = (HttpURLConnection) baseUrl.openConnection();
    connection.addRequestProperty("Accept", "application/json")
    connection.addRequestProperty("Authorization", "Basic ${"${username}:${password}".bytes.encodeBase64().toString()}")

    def response = [:]
    if (connection.responseCode == 200) {
        response = new JsonSlurper().parseText(connection.inputStream.getText("UTF-8"))
    } else {
        response = new JsonSlurper().parseText(connection.errorStream.getText("UTF-8"))
    }

    def branches = response["values"] as List

    for (branch in branches) {
        def branchName = branch.getAt("name")
        resultBranches.add(branchName)
    }

    return resultBranches.join("\n")
}