import React, {createContext, useContext, useState, useEffect} from 'react';

const CollectionContext = createContext();

// hook to use context
export const useCollection = () => {
    const context = useContext(CollectionContext);
    if (!context) {
        throw new Error("Use collection must be used within a collectionProvider")
    }
    return context;
}

// provider context
export const CollectionProvider = ({ children }) => {
    const [collection, setCollection] = useState(() => {
        try {
            const storedColllection = localStorage.getItem("collection");

            if (!storedColllection) {
                return [];
            }

            const parsedCollection = JSON.parse(storedColllection);

            return Array.isArray(parsedCollection) ? parsedCollection : [];
        } catch (e) {
            console.log(`Error parsing data from local storage: ${e}`)
        }
    });

    useEffect(() => {
        localStorage.setItem("collection", JSON.stringify(collection));
    }, [collection]);

    const value = {
        collection,
        setCollection
    };

    return (
        <CollectionContext.Provider value={value}>
            {children}
        </CollectionContext.Provider>
    );
};

