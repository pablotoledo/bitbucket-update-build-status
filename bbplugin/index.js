"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("azure-pipelines-task-lib/task");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const instance = tl.getInput('instance', true);
            console.log('InstanceURL', instance);
            const userbb = tl.getInput('userbb', true);
            console.log('UserBitbucket', userbb);
            const passwordbb = tl.getInput('passwordbb', true);
            console.log('Password/Token', passwordbb);
            const commitresult = tl.getInput('commitresult', true);
            console.log('Commit Status', commitresult);
            const commitid = tl.getInput('commitid', true);
            console.log('Commit ID', commitid);
            var username = userbb;
            var password = passwordbb;
            var auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
            var urlcommit = instance + '/rest/build-status/1.0/commits/' + commitid;
            var axios = require('axios');
            //$buildUrl="$(System.TeamFoundationCollectionUri)$(System.TeamProject)/_build/results?buildId=$(Build.BuildId)" 
            let teamuri = tl.getVariable('System.TeamFoundationCollectionUri') || ''; //SYSTEM_TEAMFOUNDATIONCOLLECTIONURI
            var team = tl.getVariable('System.TeamProject') || ''; //SYSTEM_TEAMPROJECT
            var buildId = tl.getVariable('BUILD_BUILDID') || ''; //BUILD_BUILDID
            var jobName = tl.getVariable('Agent.JobName') || ''; //AGENT_JOBNAME
            console.log(teamuri);
            console.log(team);
            console.log(buildId);
            console.log(jobName);
            var body = {
                "state": commitresult,
                "key": "AzureDevOps",
                "name": jobName,
                "url": teamuri + team + '/_build/results?buildId=' + buildId,
                "description": "The Azure DevOps Pipeline result is: " + commitresult
            };
            console.log(body);
            var options = {
                'method': 'POST',
                'url': urlcommit,
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': auth
                },
                data: body
            };
            axios(options)
                .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
                .catch(function (error) {
                console.log(error);
            });
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
