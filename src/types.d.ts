export interface DirectionsParams {
    profile: string,
    coordinates: string
}

export interface Direction {
    routes: Route[];
    waypoints: Waypoint[];
    code?: string;
    uuid?: string;
    message?: string;
}

export interface Route {
    weight_name?: string;
    weight?: number;
    duration?: number;
    distance?: number;
    legs?: Leg[];
    geometry?: string;
}

export interface Leg {
    via_waypoints?: any[];
    admins?: Admin[];
    weight?: number;
    duration?: number;
    steps?: any[];
    distance?: number;
    summary?: string;
}

export interface Admin {
    iso_3166_1_alpha3?: string;
    iso_3166_1?: string;
}

export interface Waypoint {
    distance: number;
    name: string;
    location: number[];
}

export interface Marker {
    coordinates: number[],
}

export interface FeatureCollection {
    type?: string;
    query?: string[];
    places?: Feature[];
    attribution?: string;
}

export interface Feature {
    id?: string;
    type?: string;
    place_type?: string[];
    relevance?: number;
    properties?: Properties;
    text?: string;
    place_name?: string;
    bbox?: number[];
    coordinates: number[];
    geometry?: Geometry;
    context?: Context[];
}

export interface Context {
    id?: string;
    short_code?: string;
    wikidata?: string;
    mapbox_id?: string;
    text?: string;
}

export interface Geometry {
    type?: string;
    coordinates?: number[];
}

export interface Properties {
    short_code?: string;
    wikidata?: string;
    mapbox_id?: string;
    foursquare?: string;
    landmark?: boolean;
    address?: string;
    category?: string;
}
