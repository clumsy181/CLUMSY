import React, { useState, useMemo } from 'react';
import { verticalPacks, widescreenPacks } from '../constants';
import SelectionSummary from './SelectionSummary';

/**
 * Parses the number from the beginning of an item string (e.g., "100 PACK" -> 100).
 * Returns 0 if no number is found.
 */
const parseVisualsCount = (itemName: string): number => {
  const match = itemName.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

/**
 * A single interactive item in the list. Changes appearance when selected.
 */
const ItemCard: React.FC<{ name: string; isSelected: boolean; onToggle: (name: string) => void }> = ({ name, isSelected, onToggle }) => {
  const baseClasses = "flex items-center justify-between border-b cursor-pointer transition-all duration-200 py-3 px-2";
  const selectedClasses = "bg-lime-900/50 border-lime-700 text-lime-300";
  const notSelectedClasses = "border-gray-800/50 text-gray-300 hover:bg-gray-800/30";

  return (
    <div
      onClick={() => onToggle(name)}
      className={`${baseClasses} ${isSelected ? selectedClasses : notSelectedClasses}`}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={0}
    >
      <p className="font-medium">{name}</p>
      {/* Custom checkbox visual indicator */}
      <div className={`flex-shrink-0 w-6 h-6 border-2 rounded-md flex items-center justify-center transition-colors duration-200
        ${isSelected ? 'bg-lime-500 border-lime-400' : 'border-gray-600'}`}
      >
        {isSelected && (
          <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
        )}
      </div>
    </div>
  );
};

/**
 * A column in the catalog, containing a title and a list of items.
 */
const CatalogColumn: React.FC<{ title: string; items: string[]; selectedItems: Set<string>; onToggle: (name: string) => void; }> = ({ title, items, selectedItems, onToggle }) => (
  <div>
    <h2 className="text-3xl font-bold text-white mb-6 sticky top-0 bg-[#111111] py-4 z-10">{title}</h2>
    {/* Scrollable container for the item list */}
    <div className="max-h-[60vh] overflow-y-auto pr-2">
      <div className="flex flex-col">
        {items.map((item) => (
          <ItemCard
            key={item}
            name={item}
            isSelected={selectedItems.has(item)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  </div>
);


const ProductCatalog: React.FC = () => {
  // State to track all selected item names
  const [selectedItems, setSelectedItems] = useState(new Set<string>());

  // Toggles an item's selection status
  const handleToggleItem = (itemName: string) => {
    setSelectedItems(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(itemName)) {
        newSelected.delete(itemName);
      } else {
        newSelected.add(itemName);
      }
      return newSelected;
    });
  };
  
  // Memoize filtered selections to pass to the summary
  const { selectedVertical, selectedWidescreen } = useMemo(() => {
    const selectedArray = [...selectedItems];
    return {
      selectedVertical: selectedArray.filter(item => verticalPacks.includes(item)),
      selectedWidescreen: selectedArray.filter(item => widescreenPacks.includes(item)),
    };
  }, [selectedItems]);


  // Calculate the total number of visuals based on selected items
  const totalVisuals = useMemo(() => {
    return [...selectedItems].reduce((total, item) => total + parseVisualsCount(item), 0);
  }, [selectedItems]);

  return (
    // Added padding-bottom to ensure the sticky summary bar doesn't hide content
    <section id="catalog" className="pb-40">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
        <CatalogColumn
          title="Vertical 9:16 Packs (Gói Dọc)"
          items={verticalPacks}
          selectedItems={selectedItems}
          onToggle={handleToggleItem}
        />
        <CatalogColumn
          title="Widescreen 16:9 Packs (Gói Ngang)"
          items={widescreenPacks}
          selectedItems={selectedItems}
          onToggle={handleToggleItem}
        />
      </div>
      <SelectionSummary 
        selectedVertical={selectedVertical}
        selectedWidescreen={selectedWidescreen}
        totalVisuals={totalVisuals} 
      />
    </section>
  );
};

export default ProductCatalog;