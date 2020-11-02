const api = axios.create({
    baseURL: 'http://localhost/api/'
});

window.addEventListener('load', function(){
    getProfiles();
});

function getProfiles(){
    api.get('list-all.php').then(response => {

        renderProfiles(response.data)

    }).catch (err => {
        console.log(err)
    })
}

function renderProfiles(profiles) {

    let container = document.getElementById('container');

    [...profiles.result].forEach(profile =>{

    let article = document.createElement('article');

    article.innerHTML = 
    `
      <div class="avatar">
            <img src="https://avatars3.githubusercontent.com/u/69631?v=4" alt="">
        </div>
        <div class="repo-info">
          <strong>${profile.name}</strong>
          <div class="description">
            <p>${profile.about}</p>
          </div>
          <div class="skills">
            <ul>
                ${profile.skills.map(el => {
                
                  return `<li class='badge ${(el.name == 'vue.js' ? 'vue' : el.name)}'>${el.name}</li>`

                }).join('')}
                
                </ul>
              </div>
              <div class="social">
                <ul>
                  ${profile.social.map(social => {
                   
                    if(social.name == 'github' && social.url) {
                      return `<li>
                                <a href="${social.url}">
                                  <i class="fab fa-github" style="color: #FFF"></i><span>GIT</span>
                                 </a>
                             </li>`
                    }
       }).join('')}
                </ul>
              </div>
            </div>
      `;
      container.appendChild(article)
    });
} 
