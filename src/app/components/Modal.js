import React, { useState } from 'react';
import { Modal, Button } from '@heathmont/moon-core-tw';
import { useRouter } from 'next/navigation';

const Example = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const closeModal = () => {
    setIsOpen(false);
    router.push('/level/1');
  };
  const openModal = () => setIsOpen(true);
  return (
    <>
      {/* <Button onClick={openModal}>Open dialog</Button> */}
      <Modal open={isOpen} onClose={closeModal}>
        <Modal.Backdrop />
        <Modal.Panel className='bg-white text-black md:mx-52 m-8'>
        <div className='p-4'>
            <img
              src='/assets/tutorial_picture.PNG'
              alt='How to Play'
              className='w-full mb-4'
            />
          </div>
          <div className='p-4 border-b-2 border-beerus '>
            <h3 className='text-moon-18 text-bulma font-medium'>
              How to Play
            </h3>
          </div>
          <div className='p-4'>
            <p className='text-moon-sm text-trunks'>
              Connect the same colored dots to complete the level. You can
              connect the dots horizontally, vertically.
            </p>
          </div>
          <div className='p-4 border-t-2 border-beerus'>
            <Button onClick={closeModal} className='border-2'>Continue</Button>
          </div>
        </Modal.Panel>
      </Modal>
    </>
  );
};

export default Example;
