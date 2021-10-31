# Bitbucket Update Build Status
[![Build Status](https://jptg-projects.visualstudio.com/bitbucket-update-build-status/_apis/build/status/pablotoledo.bitbucket-update-build-status?branchName=master)](https://jptg-projects.visualstudio.com/bitbucket-update-build-status/_build/latest?definitionId=31&branchName=master)

An Azure DevOps Pipeline plugin to still using on-premises Bitbucket Server/Datacenter instances, this plugin let you define the build result for commits checked during a job executed in an agent by invoking the Bitbucket API.
  

## How to use this plugin

 1. Install this extensión on your Azure DevOps organization to let you select this functionality during the job definition. https://marketplace.visualstudio.com/items?itemName=pablotoledo.bitbucket-commit-status
 2. Create a generic service connection in your Azure DevOps project using the URL of your Bitbucket Instance and the credentials (user and passwd/token).
 3. In your pipeline, search the marketplace for the task with name "Bitbucket Server Commit Status".
 4. Fill in all parameters required.

## How to contribute
 1. Fork this project
 2. Install required software  `npm install -g tfx-cli`
 3. Make your changes
 4. Execute the command `npx tfx-cli extension create` to create a .vsix file
 5. Upload the .vsix file to the Azure DevOps Marketplace
 6. Test the extension and create the pull request

## License
This work is licensed under the terms of the MIT license.
For a copy, see <https://opensource.org/licenses/MIT>.
