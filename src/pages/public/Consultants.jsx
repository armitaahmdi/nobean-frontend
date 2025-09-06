import { useDispatch, useSelector } from 'react-redux'
import { fetchConsultants } from "../../features/user/consultants/consultantsSlice"
import FilterablePaginatedList from '../../components/filter/FilterablePaginatedList';
import { consultatsFilterConfig } from "../../components/filter/filterConfig";
import ConsultantsList from "../../features/user/consultants/pages/ConsultantsList";
import translate from "../../locale/translate";

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
