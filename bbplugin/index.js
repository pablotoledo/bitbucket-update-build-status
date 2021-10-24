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
            // Getting variables from Job definition
            const instance = tl.getInput('instance', true);
            const userbb = tl.getInput('userbb', true);
            const passwordbb = tl.getInput('passwordbb', true);
            const commitresult = tl.getInput('commitresult', true);
            const commitid = tl.getInput('commitid', true);
            // Preparing credential
            var username = userbb;
            var password = passwordbb;
            var auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
            var urlcommit = instance + '/rest/build-status/1.0/commits/' + commitid;
            let teamuri = tl.getVariable('System.TeamFoundationCollectionUri') || ''; //SYSTEM_TEAMFOUNDATIONCOLLECTIONURI
            var team = tl.getVariable('System.TeamProject') || ''; //SYSTEM_TEAMPROJECT
            var buildId = tl.getVariable('BUILD_BUILDID') || ''; //BUILD_BUILDID
            var jobName = tl.getVariable('Agent.JobName') || ''; //AGENT_JOBNAME
            console.log(teamuri);
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
            var axios = require('axios');
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
