const team = [
 { name:"FlexicX", role:"Founder", avatar:"https://cdn.discordapp.com/avatars/888766767814553620/6518abba7bc2e7d2ad259fa569298396.png?size=4096" },
 { name:"Michael", role:"Developer", avatar:"https://cdn.discordapp.com/avatars/1383029340538671144/a8db34964d822c4c81c809b1d21576dd.png?size=4096" },
 { name:"Kate", role:"Support", avatar:"https://cdn.discordapp.com/avatars/1382759313268936865/168283bed684150e29518236ec4179a7.png?size=4096" }
];

const el = document.getElementById("team");

team.forEach(u=>{
  el.innerHTML += `
  <div class="card ${u.role.toLowerCase()}">
    <img src="${u.avatar}">
    <h3>${u.name}</h3>
    <div class="role">${u.role}</div>
  </div>`;
});