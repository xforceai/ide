import { ModalContext } from '@/contexts/ModalContext';
import useAppStore from '@/stores/useAppStore';
import { XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';

const APIKeyModal: React.FC = () => {
  const { oaiKey, setOAIKey } = useAppStore();
  const { setModal } = React.useContext(ModalContext);

  const onChangeAPIKey = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setOAIKey(val);
    },
    [setOAIKey],
  );

  return (
    <div className="rounded-sm border border-gray-200 text-sm max-w-96 shadow-xl">
      <div className="bg-white border-b border-b-gray-200 p-2 flex justify-between items-center">
        <p className="font-bold">Set Up LLM Key</p>
        <XMarkIcon width={16} onClick={() => setModal(null)} className="cursor-pointer" />
      </div>
      <div className="bg-gray-50 p-2">
        <div className="flex">
          <span className="font-bold uppercase">Provider</span>
          <span className="text-gray-500 ml-2">OpenAI</span>
        </div>
        <div className="mt-2">
          <p className="font-bold uppercase">Key</p>
          <input
            type="text"
            placeholder="sk-****"
            onChange={onChangeAPIKey}
            value={oaiKey}
            className="p-1 bg-white rounded-sm border border-gray-200 placeholder:text-gray-300 focus:outline-none focus:bg-white focus:border-teal-500 mt-1 w-full"
          />
          <p className="text-gray-500 mt-2 text-xs">
            Your API Key will never going to be stored on cloud, it will be temporarily saved only for the current
            session, and will be deleted whenever you close this session. If you don’t add your API Key, you’ll need to
            manually add it to the code after you export as Python script.
          </p>
        </div>
      </div>
    </div>
  );
};

export default APIKeyModal;
