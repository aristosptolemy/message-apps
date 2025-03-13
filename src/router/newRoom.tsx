import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { newgroupBuild } from '../backend/server';

import '../css/dialog.css';

interface ConfirmDialogProps {
  isOpen: boolean;
  onCancel: () => void;
}

const RoomRelated: React.FC<ConfirmDialogProps> = ({ isOpen,onCancel }) => {
  if (!isOpen) return null;
  const [groupname, setGroupname] = useState('');

  return ReactDOM.createPortal(
    <div className="dialog-overlay">
      <div className="dialog">
        <div>
          <div className="new-group-build-area">
            <div className="new-group-build-title">新しいチャットルームを作成する</div>
            <input
              type="text"
              value={groupname}
              onChange={(e) => setGroupname(e.target.value)}
              placeholder="ルーム名を入力"
            />
          </div>

        </div>
        <button onClick={onCancel}>キャンセル</button>
      </div>
    </div>,
    document.body
  );
};

export default RoomRelated;