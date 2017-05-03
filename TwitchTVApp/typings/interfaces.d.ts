interface IStreamsEndpoint {
    streams: IStream[],
    _links: {}
}

interface IStream {
    _id: number,
    game: string,
    viewers: number,
    created_at: string,
    video_height: number,
    average_fps: number,
    delay: number,
    is_playlist: boolean;
    links: {},
    preview: { small: string, medium: string, large: string, template: string }
    channel: IChannel
}

interface IChannel {
    name: string,
    display_name: string,
    status: string,
    logo: string;
    url: string;
}

interface IChannelsEndpoint {
    name: string,
    logo: string,
    url: string
}

interface IChannelSummary { name: string, logo: string, status: string, url: string }