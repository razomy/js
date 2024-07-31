import { exec } from 'child_process';


function log(error, stdout, stderr)  {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
}

exec('npm -v', log);
exec('node -v', log);
exec('ls -a', log);
