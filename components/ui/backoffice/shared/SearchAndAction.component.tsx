// Components
import { Button } from '@/components/shared/Button.components';

// React libs
import React from 'react';

// Icons
import { IoIosSearch } from 'react-icons/io';

interface SearchAndActionsProps {
  placeholder: string;
  onAddClick: () => void;
  addButtonText: string;
}

const SearchAndActions: React.FC<SearchAndActionsProps> = ({
  placeholder,
  onAddClick,
  addButtonText,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <label className="input input-bordered flex items-center gap-2">
        <input type="text" className="grow w-64" placeholder={placeholder} />
        <IoIosSearch />
      </label>
      <Button
        className="bg-button rounded-lg py-2 px-3 shadow-xs-light"
        onClick={onAddClick}
      >
        {addButtonText}
      </Button>
    </div>
  );
};

export default SearchAndActions;
