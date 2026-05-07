package com.lumba.petstore.repository;

import com.lumba.petstore.domain.PetListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PetListingRepository extends JpaRepository<PetListing, Long>, JpaSpecificationExecutor<PetListing> {
}
