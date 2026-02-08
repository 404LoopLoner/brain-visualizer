let scene, camera, renderer, mesh;
let dataset = [];

fetch("data.json")
  .then(response => response.json())
  .then(data => dataset = data);

function initScene() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75, 600 / 400, 0.1, 1000
  );
  camera.position.z = 3;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(600, 400);

  document.getElementById("viewer").innerHTML = "";
  document.getElementById("viewer").appendChild(renderer.domElement);

  const light = new THREE.PointLight(0xffffff);
  light.position.set(5, 5, 5);
  scene.add(light);
}

function createModel(type) {
  let geometry;

  if (type === "cube")
    geometry = new THREE.BoxGeometry();
  else if (type === "sphere")
    geometry = new THREE.SphereGeometry();
  else if (type === "cone")
    geometry = new THREE.ConeGeometry();
  else if (type === "pyramid")
    geometry = new THREE.ConeGeometry(1,1,4);

  const material = new THREE.MeshStandardMaterial({color: 0x00ffcc});
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}

function animate() {
  requestAnimationFrame(animate);
  if(mesh){
    mesh.rotation.y += 0.01;
  }
  renderer.render(scene, camera);
}

function analyze(task) {

  let filtered = dataset.filter(d => d.task_label === task);

  if(task === "random"){
    filtered = dataset;
  }

  const row = filtered[Math.floor(Math.random() * filtered.length)];

  initScene();
  createModel(row.object_type);
  animate();

  document.getElementById("dataOutput").innerHTML = `
    C3 Alpha: ${row.C3_alpha}<br>
    Cz Alpha: ${row.Cz_alpha}<br>
    C4 Alpha: ${row.C4_alpha}<br>
    C3 Beta: ${row.C3_beta}<br>
    Cz Beta: ${row.Cz_beta}<br>
    C4 Beta: ${row.C4_beta}<br>
    Feature Energy: ${row.feature_energy}
  `;
}

function createModel(type) {
  let geometry;

  if (type === "cube")
    geometry = new THREE.BoxGeometry();

  else if (type === "sphere")
    geometry = new THREE.SphereGeometry(0.8, 32, 32);

  else if (type === "cone")
    geometry = new THREE.ConeGeometry(0.8, 1.5, 32);

  else if (type === "pyramid")
    geometry = new THREE.ConeGeometry(1, 1.5, 4);

  const material = new THREE.MeshStandardMaterial({ color: 0xff4444 });

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}
