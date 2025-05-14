package com.ungs.docsys.utils;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;

public class PageUtils {

    public static Pageable getPageable(int page, int size, String[] sort) {
        if (sort == null || sort.length == 0) {
            return PageRequest.of(page, size);
        }
        List<Sort.Order> orders = new ArrayList<>();
        for (String sortParam : sort) {
            String[] parts = sortParam.split(",");
            if (parts.length == 2) {
                orders.add(new Sort.Order(Sort.Direction.fromString(parts[1].trim()), parts[0].trim()));
            } else {
                orders.add(new Sort.Order(Sort.Direction.ASC, sortParam.trim()));
            }
        }
        return PageRequest.of(page, size, Sort.by(orders));
    }
}
