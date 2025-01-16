import { useState } from 'react';
import { Pagination, Box } from "@mui/material";


const PaginatedBox = ({ items }: { items: any[] }) => {
    const [page, setPage] = useState(1);
    const count = 5;

    const startIndex = (page - 1) * count;
    const displayedItems = items.slice(startIndex, startIndex + count);

    const handlePage = (event, value) => {
        setPage(value);
    }

    return (
        <Box sx={{ width: "80%" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2,  }}>
                {displayedItems.map((item, index) => (
                    <Box key={index}>
                        {item}
                    </Box>
                ))}
            </Box>
            <Pagination
                count={Math.ceil(items.length / count)}
                page={page}
                onChange={handlePage}
                sx={{ marginTop: 2, display: "flex", justifyContent: "center", marginLeft: "-10em" }}
            /> 
        </Box>
    )
}

export default PaginatedBox;