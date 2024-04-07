import { useState } from 'react';

export default function useTrait(initialValue: number) {
   const [trait, updateTrait] = useState(initialValue);

   let current = trait;

   const get = () => current;

   const set = (newValue: number) => {
      current = newValue;
      updateTrait(newValue);
      return current;
   }

   return {
      get,
      set,
   }
}