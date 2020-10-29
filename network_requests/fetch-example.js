async function getUsers(names){
      //if you don't want separate jobs to have to wait for eachother
      let jobs = [];

      //setup all jobs
      for (let name of names) {
            let job = fetch(`https://api.github.com/users/${name}`)
            .then(
                  successResponse => {
                        if (successResponse.status != 200 ){
                              return null;
                        } else {
                              return successResponse.json();
                        }
                  },
                  failResponse => {
                        return null;
                  }
            );
            jobs.push(job);
      }
      
      //await all jobs
      let results = await Promise.all(jobs);
      return results;
}