import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const saleTagVariant = {
  'on-sale': {
    label: 'Sale',
    style: { '--background-color': COLORS.primary },
  },
  'new-release': {
    label: 'Just released!',
    style: { '--background-color': COLORS.secondary },
  },
  'default': {
    label: '',
    style: { '--background-color': 'transparent' },
  },
};

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const saleTag = saleTagVariant[variant];

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          <SaleTag style={saleTag.style}>{saleTag.label}</SaleTag>
        </ImageWrapper>
        <Spacer size={14} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{
              '--color': variant === 'on-sale' ? COLORS.gray[700] : COLORS.gray[900],
              '--text-decoration': variant === 'on-sale' ? 'line-through' : 'initial'
            }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Spacer size={6} />
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {salePrice && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  position: relative;
  line-height: 0;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const SaleTag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  padding: 7px 9px 9px 10px;
  border-radius: 4px;
  background-color: var(--background-color);
  color: ${COLORS.white};
  font-weight: ${WEIGHTS.medium};
`

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  font-size: 1rem;
  font-weight: ${WEIGHTS.normal};
  color: var(--color);
  line-height: ${18.78 / 16};
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-size: 1rem;
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
  line-height: ${18.78 / 16};
`;

export default ShoeCard;
