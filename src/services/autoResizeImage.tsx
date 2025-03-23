import React, {useState, useEffect} from 'react';
import {Image, View, ActivityIndicator} from 'react-native';

interface ResponsiveImageProps {
  source: {uri: string} | number;
  style?: object;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({source, style}) => {
  const [aspectRatio, setAspectRatio] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const getImageSize = () => {
      if (typeof source === 'number') {
        // Local image
        const {width, height} = Image.resolveAssetSource(source);
        if (isMounted) {
          setAspectRatio(width / height);
          setLoading(false);
        }
      } else {
        // Remote image
        Image.getSize(
          source.uri,
          (width, height) => {
            if (isMounted) {
              setAspectRatio(width / height);
              setLoading(false);
            }
          },
          error => {
            console.error('Error getting image size:', error);
            if (isMounted) setLoading(false);
          },
        );
      }
    };

    getImageSize();

    return () => {
      isMounted = false;
    };
  }, [source]);

  if (loading) {
    return (
      <View style={[style, {justifyContent: 'center', alignItems: 'center'}]}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

  return (
    <Image
      source={source}
      fadeDuration={300} // Smooth loading
      progressiveRenderingEnabled={true}
      style={[
        style,
        {
          width: '100%',
          height: undefined,
          aspectRatio: aspectRatio,
          resizeMode: 'contain',
        },
      ]}
    />
  );
};

export default ResponsiveImage;
