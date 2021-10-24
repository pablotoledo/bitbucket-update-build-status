import tl = require('azure-pipelines-task-lib/task');

async function run() {
    try {
        const instance: string | undefined = tl.getInput('instance', true);
        console.log('InstanceURL', instance);

        const userbb: string | undefined = tl.getInput('userbb', true);
        console.log('UserBitbucket', userbb);

        const passwordbb: string | undefined = tl.getInput('passwordbb', true);
        console.log('Password/Token', passwordbb);

        const commitresult: string | undefined = tl.getInput('commitresult', true);
        console.log('Commit Status', commitresult);

        const commitid: string | undefined = tl.getInput('commitid', true);
        console.log('Commit ID', commitid);

        var username = userbb;
        var password = passwordbb;
        var auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
        var urlcommit = instance+'/rest/build-status/1.0/commits/'+commitid
        var axios = require('axios');
        //$buildUrl="$(System.TeamFoundationCollectionUri)$(System.TeamProject)/_build/results?buildId=$(Build.BuildId)" 

        let teamuri:string = tl.getVariable('System.TeamFoundationCollectionUri') || '';//SYSTEM_TEAMFOUNDATIONCOLLECTIONURI
        var team:string = tl.getVariable('System.TeamProject') || '';//SYSTEM_TEAMPROJECT
        var buildId:string = tl.getVariable('BUILD_BUILDID') || '';//BUILD_BUILDID
        var jobName:string = tl.getVariable('Agent.JobName') || '';//AGENT_JOBNAME
        console.log(teamuri);
        console.log(team);
        console.log(buildId);
        console.log(jobName);

        var body = {
            "state": commitresult,
            "key": "AzureDevOps",
            "name": jobName,
            "url": teamuri +team+'/_build/results?buildId='+buildId,
            "description": "The Azure DevOps Pipeline result is: "+commitresult
        }
        console.log(body);

        var options = {
            'method': 'POST',
            'url': urlcommit,
            'headers': {
              'Content-Type': 'application/json',
              'Authorization': auth
            },
            data : body
          };

        axios(options)
        .then(function (response: any) {
        console.log(JSON.stringify(response.data));
        })
        .catch(function (error: any) {
        console.log(error);
        });
        
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();