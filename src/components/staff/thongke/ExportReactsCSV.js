import React from 'react'
import { CSVLink } from 'react-csv'
import Button from 'react-bootstrap/Button';

export const ExportReactsCSV = ({csvData, fileName}) => {
    return (
        <Button variant="warning">
            <CSVLink data={csvData} filename={fileName}>Export Excel</CSVLink>
        </Button>
    )
}