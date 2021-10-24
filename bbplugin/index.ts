import tl = require('azure-pipelines-task-lib/task');

async function run() {
    try {
        // Getting variables from Job definition
        const instance: string | undefined = tl.getInput('instance', true);
        const userbb: string | undefined = tl.getInput('userbb', true);
        const passwordbb: string | undefined = tl.getInput('passwordbb', true);
        const commitresult: string | undefined = tl.getInput('commitresult', true);
        const commitid: string | undefined = tl.getInput('commitid', true);

        // Preparing credential
        var username = userbb;
        var password = passwordbb;
        var auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
        var urlcommit = instance+'/rest/build-status/1.0/commits/'+commitid

        let teamuri:string = tl.getVariable('System.TeamFoundationCollectionUri') || '';//SYSTEM_TEAMFOUNDATIONCOLLECTIONURI
        var team:string = tl.getVariable('System.TeamProject') || '';//SYSTEM_TEAMPROJECT
        var buildId:string = tl.getVariable('BUILD_BUILDID') || '';//BUILD_BUILDID
        var jobName:string = tl.getVariable('Agent.JobName') || '';//AGENT_JOBNAME
        console.log(teamuri);

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
        
        var axios = require('axios');
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