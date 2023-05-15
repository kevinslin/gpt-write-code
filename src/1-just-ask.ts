import * as path from 'path';
import * as nodegit from 'nodegit';

const repoUrl = 'https://github.com/awsdocs/amazon-s3-userguide';
const serviceName = 's3';
const currentDirectory = process.cwd();
const destinationDirectory = path.join(currentDirectory, 'docs', serviceName, 'developer-guide');

async function cloneOrPullRepository() {
  try {
    // Check if the repository already exists
    const repositoryExists = await nodegit.Repository.open(destinationDirectory)
      .then(() => true)
      .catch(() => false);

    if (repositoryExists) {
      // If the repository exists, perform a pull operation
      const repository = await nodegit.Repository.open(destinationDirectory);
      const remote = await repository.getRemote('origin');
      await remote.fetch();
      await repository.mergeBranches('master', 'origin/master');
      console.log('Repository pulled successfully.');
    } else {
      // If the repository doesn't exist, perform a clone operation
      await nodegit.Clone.clone(repoUrl, destinationDirectory);
      console.log('Repository cloned successfully.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

cloneOrPullRepository();
