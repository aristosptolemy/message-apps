import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import toast from 'react-hot-toast';

import '../css/dialog.css';

interface ConfirmDialogProps {
  isOpen: boolean;
  onCancel: () => void;
}

const AcountManegement: React.FC<ConfirmDialogProps> = ({ isOpen,onCancel }) => {
  if (!isOpen) return null;
  const nowPassWord = sessionStorage.getItem('accountPass') ?? '';
  const [newPassword, setPasswprd] = useState('');

  const [confirmationPass, setconfirmationPass] = useState('');

  const newPassWordSet = (value) => {
    if(value === nowPassWord){
      toast.error("現在のパスワードと同じです")
    }else {
      setPasswprd(value)
    }
  }
  const PassWordChanged = () => {

  };

  return ReactDOM.createPortal(
    <div className="dialog-overlay">
      <div className="dialog">
        <div>
          <div className="new-password-area">
            <div className="new-password-title">パスワードを変更する</div>
            <input
              type="text"
              value={newPassword}
              onChange={(e) => newPassWordSet(e.target.value)}
              placeholder="新しいパスワード"
            />
            <input
              type="text"
              value={confirmationPass}
              onChange={(e) => setconfirmationPass(e.target.value)}
              placeholder="確認用"
            />
            <button type="button" onClick={() => PassWordChanged()}>変更を実行</button>
          </div>
        </div>
        <button onClick={onCancel}>閉じる</button>
      </div>
    </div>,
    document.body
  );
};

export default AcountManegement;