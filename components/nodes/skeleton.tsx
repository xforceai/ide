import React from 'react';

type Props = {
  header: React.JSX.Element;
  content: React.JSX.Element;
};

type ClsHeaderSkeletonProps = {
  name: string;
};
export const ClsHeaderSkeleton: React.FC<ClsHeaderSkeletonProps> = ({ name }) => {
  return (
    <p className="text-sm">
      <span className="text-red-500">class</span>
      <span className="text-purple-400 pl-1">{name}</span>
    </p>
  );
};

type MethodHeaderSkeletonProps = {
  name: string;
};
export const MethodHeaderSkeleton: React.FC<MethodHeaderSkeletonProps> = ({ name }) => {
  return (
    <p className="text-sm">
      <span className="text-red-500">def</span>
      <span className="text-sky-400 pl-1">{name}</span>
    </p>
  );
};
type DefaultContentProps = {
  name?: string;
  description: string;
  docTeaser?: string;
};
export const DefaultContent: React.FC<DefaultContentProps> = ({ name, description, docTeaser }) => {
  return (
    <>
      <p className="text-sm">
        {name && <span className="bg-gray-100 px-1 rounded-[2px] text-gray-600">{name}</span>}
        <span className="text-black pl-1">{description}</span>
      </p>
      <p className="text-gray-500 text-sm mt-4 whitespace-pre-line">{docTeaser}</p>
    </>
  );
};

export const ToolbarSkeleton: React.FC<Props> = ({ header, content }) => {
  return (
    <div className="bg-white border border-gray-300 rounded max-w-96">
      <div className="bg-gray-50 border-b-[0.5px] border-b-gray-300 px-2 py-2">{header}</div>
      <div className="px-2 py-4">{content}</div>
    </div>
  );
};
