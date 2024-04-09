import getAddressFromGoogleObject from '@/utils/address.util';
import { TextField } from '@mui/material';
import { StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';

const GoogleAutoCompleteAddress = ({ address, setAddress }: any) => {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.GOOGLE_MAP_KEY as string,
		libraries: ['places', 'geometry'],
	});
	const [addressText, setAddressText] = useState('');
	useEffect(() => {
		if (address?.specifically) {
			setAddressText(address?.specifically);
		}
	}, [address]);
	const mapRef = useRef<any>();
	const handleChangeAddress = () => {
		const [place] = mapRef?.current?.getPlaces();
		console.log(place);
		const address = getAddressFromGoogleObject(place);
		setAddress(address);
	};

	return isLoaded ? (
		<>
			<StandaloneSearchBox
				onLoad={(ref) => {
					if (ref && mapRef) {
						return (mapRef.current = ref);
					}
				}}
				onPlacesChanged={handleChangeAddress}
				bounds={
					new google.maps.LatLngBounds({
						lat: 20.893435916325902,
						lng: 105.7647307871195,
					})
				}
			>
				<TextField
					fullWidth
					type="text"
					value={addressText || ''}
					onChange={(event) =>
						setAddressText((prev) => {
							prev = event.target.value;
							return prev;
						})
					}
				/>
			</StandaloneSearchBox>
		</>
	) : (
		<></>
	);
};

export default GoogleAutoCompleteAddress;
