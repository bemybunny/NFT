import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { NFTStorage, File } from 'nft.storage';
import { ethers } from 'ethers';

const Model = ({ modelUrl }) => {
  const { scene } = useGLTF(modelUrl);
  scene.scale.set(10, 10, 10);
  return <primitive object={scene} />;
};

const ModelUploader = () => {
  const [modelUrl, setModelUrl] = useState(null);
  const [file, setFile] = useState(null);
  const inputRef = useRef();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setModelUrl(url);
      setFile(file);
    }
  };

  return (
    <div>
      <input type="file" ref={inputRef} onChange={handleFileChange} accept=".glb" />
      {modelUrl && (
        <div className="space-y-4">
          <Canvas style={{ backgroundColor: 'gray', height: '300px' ,width:'500px'}}>
            <Model modelUrl={modelUrl} />
            <OrbitControls />
          </Canvas>
          <button className="bg-green-500 text-white p-2 rounded" onClick={()=>alert('For using smart contract i dont have ethereum')}>
                  NFT MINT
          </button>
        </div>
      )}
    </div>
  );
};

export default ModelUploader;
