// React libs
import React from "react";

interface Category {
    id: string;
    name: string;
  }
  
  export interface CategoryProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    categories: Category[];
  }
  
  const CategoryDifficultySelect = ({ value, onChange, categories }: CategoryProps) => (
    <select
      name="category"
      value={value || ""}
      onChange={onChange}
      className="select select-bordered w-full mb-2"
    >
      <option value="" disabled>
        Sélectionnez une catégorie
      </option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
  
  export default CategoryDifficultySelect;
  