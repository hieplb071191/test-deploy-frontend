const getAddressFromGoogleObject = (googleObject: any) => {
	const address: any = {};
	if (!googleObject || !googleObject.address_components) {
		return address;
	}

	address['specifically'] = '';

	let { address_components } = googleObject;
	address_components = address_components.filter((c: any) => !c.types.includes('postal_code'));
	const addressArr = address_components.map((a: any) => a.long_name);
	address['specifically'] = addressArr.join(',');
	address['lat'] = googleObject.geometry.location.lat();
	address['long'] = googleObject.geometry.location.lng();
	return address;
};

export default getAddressFromGoogleObject;
