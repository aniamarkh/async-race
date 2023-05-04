import { Controller } from './components/controller/controller';
import { Model } from './components/model/model';
import { View } from './components/view/view';
import './style.css';

const model = new Model();
const view = new View();
const controller = new Controller(model, view);