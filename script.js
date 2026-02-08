let scene, camera, renderer, mesh;
let dataset = [];

fetch("data.json")
  .then(response => response.json())
  .then(data => dataset = data);

function initScene() {

  document.getElementById("viewer").innerHTML = "";

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, 600/400, 0.1, 1000);
  camera.position.z = 3;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(600, 400);

  document.getElementById("viewer").appendChild(renderer.domElement);


  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

}

function createModel(type) {

  let geometry;
  let color;

  if (type === "cube") {
    geometry = new THREE.BoxGeometry();
    color = 0x4fd1ff;   // Blue
  }

  else if (type === "sphere") {
    geometry = new THREE.SphereGeometry(0.8, 32, 32);
    color = 0xff6b6b;   // Red
  }

  else if (type === "cone") {
    geometry = new THREE.ConeGeometry(0.8, 1.5, 32);
    color = 0x6bff95;   // Green
  }

  else if (type === "pyramid") {
    geometry = new THREE.ConeGeometry(1, 1.5, 4);
    color = 0xffd93d;   // Yellow
  }

  const material = new THREE.MeshStandardMaterial({
    color: color,
    emissive: color,
    emissiveIntensity: 0.3,
    metalness: 0.3,
    roughness: 0.5
  });

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

  if(filtered.length === 0){
    alert("No data found");
    return;
  }

  const row = filtered[Math.floor(Math.random() * filtered.length)];

  initScene();
  createModel(row.object_type);
  scene.background = new THREE.Color(0x111827);
  animate();

  document.getElementById("dataOutput").innerHTML = `
<table class="eegTable">
<thead>
<tr>
<th>Parameter</th>
<th>Value</th>
</tr>
</thead>
<tbody>
<tr><td>Subject ID</td><td>${row.subject_id}</td></tr>
<tr><td>Trial ID</td><td>${row.trial_id}</td></tr>
<tr><td>Task</td><td>${row.task_label}</td></tr>
<tr><td>C3 Alpha</td><td>${row.C3_alpha}</td></tr>
<tr><td>Cz Alpha</td><td>${row.Cz_alpha}</td></tr>
<tr><td>C4 Alpha</td><td>${row.C4_alpha}</td></tr>
<tr><td>C3 Beta</td><td>${row.C3_beta}</td></tr>
<tr><td>Cz Beta</td><td>${row.Cz_beta}</td></tr>
<tr><td>C4 Beta</td><td>${row.C4_beta}</td></tr>
<tr><td>Logvar C3</td><td>${row.logvar_C3}</td></tr>
<tr><td>Logvar Cz</td><td>${row.logvar_Cz}</td></tr>
<tr><td>Logvar C4</td><td>${row.logvar_C4}</td></tr>
<tr><td>Feature Energy</td><td>${row.feature_energy}</td></tr>
</tbody>
</table>
`;

}
