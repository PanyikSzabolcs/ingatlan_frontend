import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'

function Offers() {
    const [offers, setOffers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/api/ingatlan')
            .then((data => data.json()))
            .then(data => setOffers(data));
    }, [])

    return (
        <div className="tabla">
        <h1 className='ajanlataink'>Ajánlataink</h1>
            <TableContainer component={Paper} style={{boxShadow: "0px 0px 15px 0px #000"}} className="tabla">
                <Table sx={{ minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Kategória</TableCell>
                            <TableCell align="center">Leírás</TableCell>
                            <TableCell align="center">Hirdetés dátuma</TableCell>
                            <TableCell align="center">Tehermentes</TableCell>
                            <TableCell align="center">Fénykép</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {offers.map((offer) => (
                            <TableRow
                                key={offer.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{offer.kategoriaNev}</TableCell>
                                <TableCell align="center">{offer.leiras}</TableCell>
                                <TableCell align="center">{offer.hirdetesDatuma}</TableCell>
                                <TableCell align="center">{offer.tehermentes ? <span className='igen'>{"Igen"}</span> : <span className='nem'>{"Nem"}</span>}</TableCell>
                                <TableCell align="center"><img src={offer.kepUrl} alt="kepek" style={{ maxHeight: 250 }} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

        // <div>
        //     {offers.map(offer => (
        //         <div>{offer.leiras}</div>
        //     ))
        //     }
        // </div>
    );
}

export default Offers