import SettingModal from '@/components/modals/AppStatus/APIKeyModal';
import { ModalContext } from '@/contexts/ModalContext';
import useMountedState from '@/hooks/useMountedState';
import useAppStore from '@/stores/useAppStore';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

type AppStatusItemProps = {
  name: string;
  value: boolean;
  onClick: () => void;
};
const AppStatusItem: React.FC<AppStatusItemProps> = ({ name, value, onClick }) => {
  return (
    <div className="flex cursor-pointer mt-1" onClick={onClick}>
      <p className="text-gray-600">{name}</p>
      {!value ? (
        <div className="text-red-400 ml-2 flex">
          <span>Not set it up yet!</span>
          <XCircleIcon width={16} className="ml-1" />
        </div>
      ) : (
        <div className="text-teal-500 ml-2 flex">
          <span>Ready</span>
          <CheckCircleIcon width={16} className="ml-1" />
        </div>
      )}
    </div>
  );
};

const AppStatus: React.FC = () => {
  const isMounted = useMountedState();
  const { setModal } = React.useContext(ModalContext);
  const { oaiKey } = useAppStore();

  const onClickSetAPIKey = () => {
    setModal(<SettingModal />);
  };

  if (!isMounted()) return <></>;
  return (
    <div className="absolute bottom-6 left-6 bg-gray-50 border border-gray-200 z-10 rounded-sm flex flex-col px-2 py-1 text-sm">
      <p className="font-bold text-gray-700 uppercase">XF IDE Status</p>
      <AppStatusItem name="LLM API Key" value={!!oaiKey} onClick={onClickSetAPIKey} />
    </div>
  );
};

export default AppStatus;
