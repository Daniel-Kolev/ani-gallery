import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";

const geometry = new BoxGeometry(10, 0, 10);
const material = new MeshBasicMaterial({ color: 0xffff00 });
const mesh = new Mesh(geometry, material);

export default [mesh];
