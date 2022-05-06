document.querySelector('.search-text').value = 'aaronsw';

function renderData(){
    user = document.querySelector('.search-text').value;
    document.querySelector('.search-text').value = '';

    fetch(`https://api.github.com/users/${user}`).then(response => {
            return response.json();
        }).then(data => {
            var username = data.login;
            var createdon = data.created_at;
            var followers = data.followers;
            var following = data.following;
            var avatar = data.avatar_url;

            const create = new Date(createdon);
            const now = new Date();
            var days = Math.ceil((now.getTime() - create.getTime())/86400000);

            document.querySelector('.username .row-item-content').innerHTML = `<a href="https://github.com/${username}" target="_blank">${username}</a>`;
            document.querySelector('.followers .row-item-content').innerText = followers;
            document.querySelector('.following .row-item-content').innerText = following;
            document.querySelector('.profile-picture img').src = avatar;
            document.querySelector('.created .row-item-content').innerText = `${days} days ago`;
        })
    
    fetch(`https://api.github.com/users/${user}/repos`).then(response => {
            return response.json();
        }).then(repo_data => {
            var username = repo_data[0].owner.login;
            var repos = [];
            for(let i = 0; i < repo_data.length; i++){
                if(repo_data[i].description == null){
                    var desc = 'none';
                }
                else {
                    var desc = repo_data[i].description;
                }
                repos.push([repo_data[i].name, desc, repo_data[i].language])
            }

            console.log(repos)

            var repo_stuff = '';
            for(let i = 0; i < repos.length; i++){
                repo_stuff = `${repo_stuff}<div class="repo-item">
                <div class="repo-item-item">
                    <div class="repo-item-heading">TITLE</div>
                    <div class="repo-item-content repo-item-item-title"><a href="https://github.com/${username}/${repos[i][0]}" target="_blank">${repos[i][0]}</a></div>
                </div>
                <div class="repo-item-item">
                    <div class="repo-item-heading">DESCRIPTION</div>
                    <div class="repo-item-content">${repos[i][1]}</div>
                </div>
                <div class="repo-item-item">
                    <div class="repo-item-heading">LANGUAGE</div>
                    <div class="repo-item-content">${repos[i][2]}</div>
                </div>
                </div>`
            }

            document.querySelector('.repos .row-item-content').innerHTML = repo_stuff;
        })
}

renderData();