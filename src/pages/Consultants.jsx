import { fetchConsultants } from "../features/consultants/consultantsSlice"
import { useDispatch, useSelector } from 'react-redux'
import FilterablePaginatedList from '../components/FilterablePaginatedList';
import { consultatsFilterConfig } from "../components/filter/filterConfig";
import ConsultantsList from "../features/consultants/ConsultantsList";
import translate from "../locale/translate";

export default function Consultants() {
    const dispatch = useDispatch();
    const { consultants, loading, error } = useSelector((store) => store.consultants)

    return (
        <>
            <FilterablePaginatedList
                fetchAction={fetchConsultants}
                items={consultants}
                loading={loading}
                error={error}
                config={consultatsFilterConfig}
                ListComponent={({ data, selectedFilters }) => (
                    <ConsultantsList
                        consultants={data}
                        selectedGender={selectedFilters.gender}
                        selectedService={selectedFilters.service}
                        selectedScientificDegree={selectedFilters.scientificDegree}
                    />
                )}
                seo={translate.consultants}
                filtersProps={{ dispatch }}
            />
        </>
    )
}
