import { extend, Application } from '@pixi/react';
import { Container, Graphics, Sprite } from 'pixi.js';

import BunnySprite from './Component/BunnySprite';

extend({ Container, Graphics, Sprite });

const Route = () => {
  return (
    <div className='Route'>
      <Application>
        <BunnySprite />
      </Application>
    </div>
  );
};

export default Route;
