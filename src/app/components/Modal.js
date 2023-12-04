import React, { useState } from 'react';
import { Modal, Button } from '@heathmont/moon-core-tw';

const Example = () => {
  const [isOpen, setIsOpen] = useState(true);
  const closeModal = () => setIsOpen(false);
  return (
    <>
      <Modal open={isOpen} onClose={closeModal}>
        <Modal.Backdrop />
        <Modal.Panel>
          <div className='bg-white text-black rounded-xl flex-col'>
            <div className='p-4 border-b-2 border-beerus'>
              <h3 className='text-moon-18 text-bulma font-medium'>
                Tutorial
              </h3>
            </div>
            <div className='p-4'>
              <p className='text-moon-sm text-trunks'>
                Connect the colors to win the game!
              </p>
            </div>
            <div className='p-4 border-t-2 border-beerus'>
              <Button onClick={closeModal}>Got it, thanks!</Button>
            </div>
          </div>
        </Modal.Panel>
      </Modal>
    </>
  );
};

export default Example;
